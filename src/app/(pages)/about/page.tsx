import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <section className="py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            FAQs - Lighteroom
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Discover answers to common questions about buying and selling
            licensed images on Lighteroom.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How do I purchase an image?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Browse our collection, add your favorite images to the cart, and
                complete your purchase with our secure payment system.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How do I upload and sell my images?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Sign up for a seller account, upload your images, and set your
                licensing terms. Earn when your images sell!
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Are there discounts available?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Yes! We offer seasonal discounts and bulk purchase offers. Stay
                updated by subscribing to our newsletter.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How can I contact support?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Reach out to us via our support page for any queries. We're here
                to assist you 24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-12 md:mt-20">
          <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
            <p className="text-gray-50">
              Didn’t find the answer you were looking for?{" "}
              <Link
                href="/contact"
                title="Contact Support"
                className="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline"
              >
                Contact our support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
