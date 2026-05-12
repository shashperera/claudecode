import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

// str_replace_editor tests

test("shows 'Creating' for str_replace_editor create command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/src/components/Button.tsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("shows 'Editing' for str_replace_editor str_replace command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/src/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("shows 'Editing' for str_replace_editor insert command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/src/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("shows 'Reading' for str_replace_editor view command", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "/src/utils/helpers.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Reading helpers.ts")).toBeDefined();
});

// file_manager tests

test("shows 'Renaming' for file_manager rename command", () => {
  render(
    <ToolCallBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/src/old.tsx", new_path: "/src/new.tsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Renaming old.tsx")).toBeDefined();
});

test("shows 'Deleting' for file_manager delete command", () => {
  render(
    <ToolCallBadge
      toolName="file_manager"
      args={{ command: "delete", path: "/src/unused.tsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Deleting unused.tsx")).toBeDefined();
});

// State tests

test("shows spinner when state is 'call'", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/src/App.jsx" }}
      state="call"
    />
  );
  // Spinner has animate-spin class
  const spinner = document.querySelector(".animate-spin");
  expect(spinner).not.toBeNull();
});

test("shows green dot when state is 'result'", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/src/App.jsx" }}
      state="result"
    />
  );
  const dot = document.querySelector(".bg-emerald-500");
  expect(dot).not.toBeNull();
  const spinner = document.querySelector(".animate-spin");
  expect(spinner).toBeNull();
});

// Filename extraction

test("extracts filename from nested path", () => {
  render(
    <ToolCallBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/very/deep/nested/Component.tsx" }}
      state="result"
    />
  );
  expect(screen.getByText("Creating Component.tsx")).toBeDefined();
});
