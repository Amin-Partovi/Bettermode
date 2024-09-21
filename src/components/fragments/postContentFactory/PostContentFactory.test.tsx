import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostContentFactory, { Field } from "./PostContentFactory";


const mockId = "123";
const mockTitleField: Field = {
  key: "title",
  value: "Sample Title",
  relationEntities: null,
};

const mockContentField: Field = {
  key: "content",
  value: "<p>This is some content</p>",
  relationEntities: null,
};

const mockImageField: Field = {
  key: "coverImage",
  value: null,
  relationEntities: {
    medias: [{ __typename: "Image", url: "https://example.com/image.jpg" }],
  },
};

const mockFeaturedField: Field = {
  key: "featured",
  value: null,
  relationEntities: null,
};

describe("PostContentFactory Component", () => {
  it("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <PostContentFactory field={mockTitleField} id={mockId} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText("Sample Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-2xl font-semibold");
  });

  it("renders the content correctly", () => {
    render(<PostContentFactory field={mockContentField} id={mockId} />);
    const contentElement = screen.getByText("This is some content");
    expect(contentElement).toBeInTheDocument();
  });

  it("renders the cover image correctly", () => {
    render(<PostContentFactory field={mockImageField} id={mockId} />);
    const imageElement = screen.getByAltText("coverImage");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("renders the featured badge correctly", () => {
    render(<PostContentFactory field={mockFeaturedField} id={mockId} />);
    const badgeElement = screen.getByText("featured");
    expect(badgeElement).toBeInTheDocument();
  });

  it("does not render anything if field is null", () => {
    const { container } = render(
      <PostContentFactory field={null as unknown as Field} id={mockId} />
    );
    expect(container.firstChild).toBeNull();
  });
});
