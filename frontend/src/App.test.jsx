import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    );

    localStorage.setItem("token", "mock-token");

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
  it("renders all elements", () => {
    expect(screen.getByText("Odinstagram")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Sign Up");
    expect(link).toHaveAttribute("href", "/signup");

    expect(screen.getByText("Welcome To OdinStagram!"));
  });
});
