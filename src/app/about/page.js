"use client";

import Head from "next/head";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>About the Project</title>
        <meta
          name="description"
          content="A research and educational scaled, smart city testbed for real-time control of autonomous driving systems."
        />
      </Head>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            About the Project
          </h1>
          <h2 className="text-lg text-gray-600">
            A Research and Educational Scaled, Smart City Testbed for Real-Time
            Control of Autonomous Driving Systems
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            <strong>Sponsor:</strong>{" "}
            <a
              href="https://www.mathworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Mathworks
            </a>
          </p>
        </section>

        {/* Principal Investigator Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Principal Investigator (PI):
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            <strong>Prof. Andreas Malikopoulos</strong>
            <br />
            Cornell University
          </p>
        </section>

        {/* Project Overview Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Project Overview
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Emerging mobility systems, such as connected and automated vehicles
            (CAVs), shared mobility, and electric vehicles, are reshaping the
            future of transportation. These innovations provide unprecedented
            opportunities for enhancing safety and efficiency in transportation
            networks. However, before large-scale deployment, a comprehensive
            evaluation of CAVs is essential, spanning from simulation to
            real-world scenarios.
          </p>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            This project leverages the{" "}
            <strong>
              Information and Decision Science Lab Scaled Smart City (IDS3C)
            </strong>
            , a 1:25 research and educational robotic testbed, to replicate
            real-world urban traffic environments. The testbed enables rapid,
            repeatable experimentation that bridges the gap between simulation
            and real-world applications. Our key research goals include:
          </p>
          <ul className="list-disc list-inside mt-4 text-base text-gray-600">
            <li>
              Developing novel approaches to model predictive control for
              autonomous driving systems, aimed at enhancing features in
              Mathworks’ products.
            </li>
            <li>
              Validating virtual sensors using machine learning and synthetic
              data from IDS3C.
            </li>
            <li>
              Creating educational modules in collaboration with Mathworks.
            </li>
            <li>
              Building a digital twin of the IDS3C, enabling virtual testbed
              environments for student competitions.
            </li>
          </ul>
        </section>

        {/* IDS Lab Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Information and Decision Science Lab (IDS Lab)
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            At the IDS Lab, our mission is to develop data-driven system
            approaches at the intersection of learning and control. Our research
            focuses on large-scale, complex cyber-physical systems (CPS),
            empowering these systems to continuously improve their performance
            by interacting with their environment. Key applications of our work
            include:
          </p>
          <ul className="list-disc list-inside mt-4 text-base text-gray-600">
            <li>Emerging mobility systems (e.g., CAVs, shared mobility)</li>
            <li>Sociotechnical systems</li>
            <li>Social media and smart cities</li>
          </ul>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            We are dedicated to fostering a{" "}
            <strong>diverse and inclusive environment</strong>. Our belief is
            that diversity in age, experience, race, ethnicity, religion, and
            gender enhances creativity and intellectual growth. We are committed
            to mutual respect, rejecting discrimination, prejudice, and
            intolerance.
          </p>
        </section>

        {/* Link Section */}
        <section className="mt-12">
          <p className="text-base text-gray-600">
            For more details, visit our project page on Mathworks:
            <a
              href="https://ids-lab.net/mathworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              Learn more about our project
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
