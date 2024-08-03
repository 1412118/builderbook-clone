const mongoose = require("mongoose")
const _ = require("lodash")
const generateSlug = require("../utils/slugify")

const { Schema } = mongoose

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,
})

mongoSchema.statics.publicFields = function () {
  return ["id", "displayName", "email", "avatarUrl", "slug", "isAdmin"]
}

/**
 * 1. If a user exits, the method finds this existing user with the Mongoose API method
 * "findOne" and updates each token inside googleToken with the Mongoose API method "updateOne"
 * 2. If a user does not exist, the method genertes a slug value from the user's "displayName"
 * and then creates a new user with the Mongoose API method "create"
 */
mongoSchema.statics.signInOrSignUp = async function ({
  googleId,
  email,
  googleToken,
  displayName,
  avatarUrl,
}) {
  const user = await this.findOne({ googleId }).select(
    this.publicFields().join(" ")
  )

  if (user) {
    const modifier = {}

    if (googleToken.accessToken) {
      modifier.access_token = googleToken.accessToken
    }

    if (googleToken.refreshToken) {
      modifier.refresh_token = googleToken.refreshToken
    }

    if (_.isEmpty(modifier)) {
      //return existing user
      return user
    }

    await this.updateOne({ googleId }, { $set: modifier })

    return user
  }

  // If the User MongoDB document does not exist in our database, the method generates a slug
  // by calling and waiting for "generateSlug"
  const slug = await generateSlug(this, displayName)
  const userCount = await this.find().countDocuments()

  //In JS, one of the uses of "this" is to access an object that is in context. In some situations
  //a method needs to access data inside an object. If so, that method can use "this" to access
  //the object's data
  const newUser = await this.create({
    createdAt: new Date(),
    googleId,
    email,
    googleToken,
    displayName,
    avatarUrl,
    slug,
    isAdmin: userCount === 0, //the very first user of our web application is an Admin user
  })

  return _.pick(newUser, publicFields())
}

const User = mongoose.model("User", mongoSchema)

module.exports = User
