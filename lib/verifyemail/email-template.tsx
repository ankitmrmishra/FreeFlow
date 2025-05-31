import * as React from "react";

interface VerificationEmailTemplateProps {
  firstName: string;
  verificationToken: string;
  email: string;
}

export const VerificationEmailTemplate: React.FC<
  Readonly<VerificationEmailTemplateProps>
> = ({ firstName, verificationToken, email }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      color: "#333333",
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: "#2563eb",
        padding: "40px 20px",
        textAlign: "center" as const,
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          fontSize: "28px",
          fontWeight: "bold",
          margin: "0 0 10px 0",
        }}
      >
        FreeFlow
      </h1>
      <p
        style={{
          color: "#e0e7ff",
          fontSize: "16px",
          margin: "0",
        }}
      >
        Your freelance business, simplified.
      </p>
    </div>

    {/* Main Content */}
    <div
      style={{
        padding: "40px 20px",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#1f2937",
        }}
      >
        Welcome to FreeFlow, {firstName}! 👋
      </h2>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "20px",
          color: "#4b5563",
        }}
      >
        Thanks for signing up! You&apos;re just one step away from accessing
        your all-in-one freelancer platform where you can showcase your work,
        manage clients, and get paid—all in one place.
      </p>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "30px",
          color: "#4b5563",
        }}
      >
        Please verify your email address by clicking the button below:
      </p>

      {/* Verification Button */}
      <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
        <a
          href={`https://kalanamak.vercel.app/api/user/verify?token=${verificationToken}&email=${email}`}
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "15px 30px",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          Verify Your Email
        </a>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "20px",
          textAlign: "center" as const,
        }}
      >
        This verification link will expire in 15 min.
      </p>

      {/* Alternative Link */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            marginBottom: "10px",
          }}
        >
          If the button doesn&apos;t work, copy and paste this link into your
          browser:
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#2563eb",
            wordBreak: "break-all" as const,
            margin: "0",
          }}
        >
          {`https://kalanamak.vercel.app/api/user/verify?token=${verificationToken}&email=${email}`}
        </p>
      </div>

      {/* What&apos;s Next */}
      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#1f2937",
          }}
        >
          What&apos;s next?
        </h3>
        <ul
          style={{
            paddingLeft: "20px",
            color: "#4b5563",
          }}
        >
          <li style={{ marginBottom: "8px" }}>
            Create your stunning portfolio
          </li>
          <li style={{ marginBottom: "8px" }}>Set up your first client</li>
          <li style={{ marginBottom: "8px" }}>Start tracking your time</li>
          <li style={{ marginBottom: "8px" }}>
            Send your first professional invoice
          </li>
        </ul>
      </div>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#4b5563",
        }}
      >
        If you didn&apos;t create an account with FreeFlow, you can safely
        ignore this email.
      </p>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "30px 20px",
        textAlign: "center" as const,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        Need help? Contact us at{" "}
        <a href="mailto:support@freeflow.com" style={{ color: "#2563eb" }}>
          support@freeflow.com
        </a>
      </p>
      <p
        style={{
          fontSize: "12px",
          color: "#9ca3af",
          margin: "0",
        }}
      >
        © 2025 FreeFlow. All rights reserved.
      </p>
    </div>
  </div>
);
