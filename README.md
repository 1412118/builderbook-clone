This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## --------------------------------------------------------------------------------------------------------------------------------------------

1. What is the \_app.tsx?

- In a Next.js project, \_app.tsx is a special file used for customizing the default behavior of your Next.js application. This file serves as the root component of your application and is responsible for initializing pages. It allows you to do things like persisting layout across pages, managing state globally, and adding additional data to your pages. (Custom App Component, Layout persistence, Global CSS and Styles, Global data fetching, Custom Error Handling)
- Overall, \_app.tsx provides a centralized location for configuring and customizing your Next.js application's behavior, making it a powerful tool for building complex and scalable web applications.

2. What is \_document.tsx?

- In a Next.js project, \_document.tsx is another special file used for customizing the default behavior of your Next.js application. While \_app.tsx is responsible for customizing the behavior of individual pages, \_document.tsx is responsible for customizing the HTML document (<html> and <body> tags) that Next.js renders for each page. (Custom Document Component, Custom HTML and Body Tags, Server-Side Rendering Setup, Global CSS and Styles, Optimization and Performance)
- Overall, \_document.tsx is a powerful tool for customizing the HTML structure and behavior of your Next.js application, allowing you to optimize SEO, accessibility, and performance while maintaining flexibility and control over the rendering process.

3. What is 'static getInitialProps' function?

- static getInitialProps() is a special method used in Next.js for data fetching, primarily in class components or in pages that don't use the newer data fetching methods like getServerSideProps or getStaticProps.

4. Server-side rendering setup

-
