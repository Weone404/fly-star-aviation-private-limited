import { describe, expect, it } from "vitest";
import { getMongoUri } from "../../api/lib/mongoUri.js";

describe("environment-specific database configuration", () => {
  it("never uses the production MongoDB URI for Vercel Preview", () => {
    expect(getMongoUri({
      VERCEL_ENV: "preview",
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
  });

  it("uses only the dedicated Preview URI for Vercel Preview", () => {
    expect(getMongoUri({
      VERCEL_ENV: "preview",
      MONGODB_URI: "mongodb+srv://production.example/db",
      PREVIEW_MONGODB_URI: "mongodb+srv://preview.example/db",
    })).toBe("mongodb+srv://preview.example/db");
  });

  it("uses the production MongoDB URI only for Production", () => {
    expect(getMongoUri({
      VERCEL_ENV: "production",
      MONGODB_URI: "mongodb+srv://production.example/db",
      PREVIEW_MONGODB_URI: "mongodb+srv://preview.example/db",
    })).toBe("mongodb+srv://production.example/db");
  });

  it("does not select a production database URI outside Vercel Production", () => {
    expect(getMongoUri({
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
    expect(getMongoUri({
      VERCEL_ENV: "development",
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
  });

  it("fails closed when the Preview database URI is absent", () => {
    expect(getMongoUri({ VERCEL_ENV: "preview" })).toBeNull();
  });
});
