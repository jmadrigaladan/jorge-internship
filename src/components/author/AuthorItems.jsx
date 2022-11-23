import React from "react";
import NewItem from "../home/NewItem.jsx";
import LazyLoadNewItem from "../home/LazyLoadNewItem.jsx";
const AuthorItems = ({ nftCollection, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection
            ? nftCollection.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <NewItem
                    nftImage={item.nftImage}
                    title={item.title}
                    price={item.price}
                    likes={item.likes}
                    nftLink={item.nftId}
                    authorImage={authorImage}
                  />
                </div>
              ))
            : new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <LazyLoadNewItem />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
