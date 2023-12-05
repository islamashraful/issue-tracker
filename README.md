# Issue Tracker

The repository showcases a real-world responsive full-stack issue-tracking application built with Next.js. It includes all the features a modern application requires like a dashboard with charts, filtering, sorting, and pagination, forms with client-side validation, user authentication with access control, modal dialog boxes, toast notification, and much more.

The following tech-stack is used to build this project.

- Next.js
- Typescript
- Tailwind
- RadixUI
- Prisma
- NextAuth

This [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<div align="center">
   <img height="500" src="/.github/images/issues-dashboard.png" />
   <img height="500" src="/.github/images/issue-list.png" />
   <img height="500" src="/.github/images/issue-details.png" />
   <img height="500" src="/.github/images/issue-edit.png" />
   <img height="500" src="/.github/images/issue-delete.png" />
</div>

## Getting Started

First, run prisma migration:

```bash
# Prisma migration
npx prisma migrate dev
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note**: Make sure you have completed the [Next Auth Google Provider](https://next-auth.js.org/providers/google) instructions and update `.env` file accordingly to see authentication related features in this application.

> This repository contains a `sql` file `(insert_sample_issues.sql)` to generate some sample issues in database

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
