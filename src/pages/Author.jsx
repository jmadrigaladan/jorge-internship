import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const Author = () => {
  let { id } = useParams();
  const [authorItems, setAuthorItems] = React.useState();
  const [authorCollection, setAuthorCollection] = React.useState();
  const [followString, setFollowString] = React.useState("Follow");
  const [followers, setFollowers] = React.useState();

  React.useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((response) => {
        setAuthorItems(response.data);
        setFollowers(response.data.followers);
        setAuthorCollection(response.data.nftCollection);
      });
  }, [id]);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorItems ? authorItems.authorImage : ""}
                        alt=""
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorItems ? authorItems.authorName : ""}
                          <span className="profile_username">
                            {authorItems ? authorItems.tag : ""}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorItems ? authorItems.address : ""}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorItems ? followers : ""} followers
                      </div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={() => {
                          if (followString === "Follow") {
                            setFollowString("UnFollow");
                            setFollowers(followers + 1);
                          } else {
                            setFollowString("Follow");
                            setFollowers(followers - 1);
                          }
                        }}
                      >
                        {followString}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={authorCollection}
                    authorImage={authorItems ? authorItems.authorImage : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
