"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/ui/ThemeConfiguration";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

// Dummy data for team members
const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "CEO",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "John Smith",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Lead Designer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Bob Williams",
    role: "Senior Developer",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function AboutUs() {
  const { themes, currentThemeId, checkAndUpdateVersion } = useThemeStore();
  const currentTheme =
    themes.find((theme) => theme.id === currentThemeId) || themes[0];

  useEffect(() => {
    checkAndUpdateVersion();
  }, [checkAndUpdateVersion]);

  const containerStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    fontFamily: currentTheme.fontFamily,
    fontSize: `${currentTheme.fontSize.medium}px`,
    overflowX: "hidden",
  };

  const sectionStyle: React.CSSProperties = {
    padding: `${currentTheme.spacing.large * 2}px`,
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: `${currentTheme.fontSize.large * 1.5}px`,
    fontWeight: "bold",
    color: currentTheme.primary,
    marginBottom: `${currentTheme.spacing.large}px`,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    borderRadius: `${currentTheme.borderRadius}px`,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: ${currentTheme.background};
        }
        ::-webkit-scrollbar-thumb {
          background: ${currentTheme.primary};
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.secondary};
        }
      `}</style>

      <section style={sectionStyle}>
        <h1 style={headingStyle}>About Our Company</h1>
        <p>
          Welcome to InnoTech Solutions, where innovation meets excellence. We
          are a cutting-edge technology company dedicated to transforming
          businesses through state-of-the-art software solutions. Our mission is
          to empower organizations with tools that drive efficiency, foster
          growth, and unlock new possibilities in the digital landscape.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Our Team</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: `${currentTheme.spacing.large}px`,
          }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: `${currentTheme.borderRadius}px`,
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Our Services</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: `${currentTheme.spacing.large}px`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle>Custom Software Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We create tailor-made software solutions to address your
                  unique business challenges and drive growth.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle>Cloud Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Seamlessly migrate your operations to the cloud, enhancing
                  scalability and reducing infrastructure costs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle>AI and Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Harness the power of AI to gain valuable insights from your
                  data and automate complex processes.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer
        style={{
          backgroundColor: currentTheme.primary,
          color: currentTheme.background,
          padding: `${currentTheme.spacing.large}px`,
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: `${currentTheme.spacing.medium}px` }}>
          Connect With Us
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: `${currentTheme.spacing.medium}px`,
          }}
        >
          <Facebook size={24} />
          <Twitter size={24} />
          <Instagram size={24} />
          <Linkedin size={24} />
          <Github size={24} />
        </div>
        <p style={{ marginTop: `${currentTheme.spacing.medium}px` }}>
          © 2024 InnoTech Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
