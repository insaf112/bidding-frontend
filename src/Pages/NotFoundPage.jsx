import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-full h-full place-items-center bg-white px-6 py-[70px]">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 pb-4 overflow-hidden text-6xl font-bold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-10 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            onClick={() => navigate("/")}
            href="#"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
