import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import routes from "./routes";

describe("App component", () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    render(
      <MemoryRouter>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </MemoryRouter>
    );

    // localStorage.setItem("token", "mock-token");

    //DO BEFORE RENDERING?
    // global.fetch = vi.fn();
    // const fakePosts = [
    //   { id: 1, content: "Post 1" },
    //   { id: 2, content: "Post 2" },
    // ];

    // fetch.mockResolvedValueOnce({
    //   ok: true,
    //   json: async () => ({ posts: fakePosts }),
    // });
  });
  it("renders properly when not logged in", () => {
    expect(
      screen.getByRole("heading", { name: "Odinstagram" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Sign Up" }))
      .toBeInTheDocument()
      .toHaveTextContent("Sign Up")
      .toHaveAttribute("href", "/signup");

    expect(screen.getByRole("link", { name: "Log In" }))
      .toBeInTheDocument()
      .toHaveTextContent("Log In")
      .toHaveAttribute("href", "/login");

    expect(screen.getByText("Welcome To Odinstagram!")).toBeInTheDocument();
    expect(screen.getByText("Sign Up To Get Started")).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Create Post" })
    ).not.toBeInTheDocument();
  });
  it("navigates to signup page", async () => {
    await user.click(screen.getByRole("link", { name: "Sign Up" }));
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Login" })
    ).not.toBeInTheDocument();
  });
  it("navigates to login page", async () => {
    await user.click(screen.getByRole("link", { name: "Log In" }));
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Sign Up" })
    ).not.toBeInTheDocument();
  });
});
