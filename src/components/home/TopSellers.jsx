import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
const TopSellers = () => {
  const [topSellers, setTopSellers] = React.useState();
  React.useEffect(() => {
    AOS.init({ once: true, duration: 2000 });
    AOS.refresh();
  }, []);
  React.useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        setTopSellers(response.data);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up">
            <ol className="author_list">
              {topSellers
                ? topSellers.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <div className="overlay__loading--pp top-sellers__pp"></div>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Link to="" className="loading">
                          Monica Lucas
                        </Link>
                        <span className="loading loading__span">2.1 ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
