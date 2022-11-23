import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewItem from "../home/NewItem.jsx";
import LazyLoadNewItem from "../home/LazyLoadNewItem.jsx";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = React.useState();
  const [index, setIndex] = React.useState(8);
  const [itemsLength, setItemsLength] = React.useState();
  const [filterValue, setFilterValue] = React.useState("");
  React.useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          filterValue == "" ? "" : `?filter=${filterValue}`
        }`
      )
      .then((response) => {
        setExploreItems(response.data);
        setItemsLength(Object.keys(response.data).length);
      });
  }, [filterValue]);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems
        ? exploreItems.slice(0, index).map((item) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.id}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItem
                authorImage={item.authorImage}
                expiryDate={item.expiryDate}
                nftImage={item.nftImage}
                title={item.title}
                price={item.price}
                likes={item.likes}
                nftLink={item.nftId}
                authorId={item.authorId}
              />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <LazyLoadNewItem />
            </div>
          ))}
      <div className="col-md-12 text-center">
        {index !== itemsLength ? (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              setIndex(index + 4);
            }}
          >
            Load more
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ExploreItems;
