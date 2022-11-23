import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  let { id } = useParams();
  const [ItemDetails, setItemDetails] = React.useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      )
      .then((response) => {
        setItemDetails(response.data);
      });
  }, [id]);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {ItemDetails ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={ItemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {ItemDetails.title} #{ItemDetails.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {ItemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {ItemDetails.likes}
                      </div>
                    </div>
                    <p>{ItemDetails.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${ItemDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={ItemDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${ItemDetails.ownerId}`}>
                              {ItemDetails.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${ItemDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={ItemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${ItemDetails.creatorId}`}>
                              {ItemDetails.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{ItemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="overlay__loading--image  loading__image--large"></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="loading loading__title">
                        {"Filler Text"} #{"999"}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views loading__height--small"></div>
                        <div className="item_info_like loading__height-small"></div>
                      </div>
                      <p className="loading">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Accusamus eos obcaecati fugiat beatae impedit
                        dolor.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/`}>
                                <div className="overlay__loading--pp top-sellers__pp"></div>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link className="loading" to={`/author/`}>
                                {"Owner Name"}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/`}>
                                <div className="overlay__loading--pp top-sellers__pp"></div>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link className="loading" to={`/author/`}>
                                {"Creator Name"}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <span className="loading loading__span">
                            {"0.18"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
export default ItemDetails;
