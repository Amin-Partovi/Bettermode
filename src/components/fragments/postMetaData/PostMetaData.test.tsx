import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import moment from "moment";
import PostMetaData from "./PostMetaData";
import { strings } from "../../../utils/strings";

const mockOwner = {
  member: {
    name: "Amin Partovi",
    profilePicture: {
      url: "https://lh3.googleusercontent.com/a/ACg8ocJVhUoGUDi1RFvU73fST7rrMVkiGNECjtYX4hI5FXgNW1XreJg=s96-c",
      __typename: "Image" as "Image",
    },
  },
};

const mockPublishedAt = "2023-09-10T14:00:00Z";

describe("PostMetaData Component", () => {
  it("renders the owner's name and profile picture", () => {
    render(<PostMetaData owner={mockOwner} publishedAt={mockPublishedAt} />);

    const nameElement = screen.getByText("Amin Partovi");
    expect(nameElement).toBeInTheDocument();

    const avatarElement = screen.getByAltText("Amin Partovi");
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute(
      "src",
      "https://lh3.googleusercontent.com/a/ACg8ocJVhUoGUDi1RFvU73fST7rrMVkiGNECjtYX4hI5FXgNW1XreJg=s96-c"
    );
  });

  it('renders the published date in "time ago" format', () => {
    const mockNow = moment("2023-09-12T14:00:00Z");
    jest
      .spyOn(moment.prototype, "fromNow")
      .mockReturnValueOnce(mockNow.fromNow());

    render(<PostMetaData owner={mockOwner} publishedAt={mockPublishedAt} />);

    const timeAgoElement = screen.getByText(mockNow.fromNow());
    expect(timeAgoElement).toBeInTheDocument();
  });

  it("renders the posted article string", () => {
    render(<PostMetaData owner={mockOwner} publishedAt={mockPublishedAt} />);

    const postedArticleElement = screen.getByText(strings.POSTED_ARTICLE);
    expect(postedArticleElement).toBeInTheDocument();
  });

  it("does not render anything if the owner or owner.member is null", () => {
    const { container } = render(
      <PostMetaData owner={null} publishedAt={mockPublishedAt} />
    );
    expect(container.firstChild).toBeNull();
  });
});
