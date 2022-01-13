import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("IN");

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${country}&apiKey=${props.apiKey}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = "NewsTurtle - " + capitalize(props.category);
    updatePage();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${page + 1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top Headlines - {capitalize(props.category)} ({country})
      </h1>
      {loading && <Spinner />}

      <div className="w-25 mx-auto d-flex">
        <select
          value={country}
          onChange={handleChange}
          className="form-select"
          aria-label="Country select"
        >
          <option value="AR">Argentina</option>
          <option value="AU">Australia</option>
          <option value="AT">Austria</option>
          <option value="BE">Belgium</option>
          <option value="BR">Brazil</option>
          <option value="BG">Bulgaria</option>
          <option value="CA">Canada</option>
          <option value="CN">China</option>
          <option value="CO">Colombia</option>
          <option value="CU">Cuba</option>
          <option value="CZ">Czech Republic</option>
          <option value="EG">Egypt</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="GR">Greece</option>
          <option value="HK">Hong Kong</option>
          <option value="HU">Hungary</option>
          <option value="IN">India</option>
          <option value="ID">Indonesia</option>
          <option value="IE">Ireland</option>
          <option value="IL">Israel</option>
          <option value="IT">Italy</option>
          <option value="JP">Japan</option>
          <option value="KR">Korea, Republic of</option>
          <option value="LV">Latvia</option>
          <option value="LT">Lithuania</option>
          <option value="MY">Malaysia</option>
          <option value="MX">Mexico</option>
          <option value="MA">Morocco</option>
          <option value="NL">Netherlands</option>
          <option value="NZ">New Zealand</option>
          <option value="NG">Nigeria</option>
          <option value="NO">Norway</option>
          <option value="PH">Philippines</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="RO">Romania</option>
          <option value="RU">Russian Federation</option>
          <option value="SA">Saudi Arabia</option>
          <option value="RS">Serbia</option>
          <option value="SG">Singapore</option>
          <option value="SK">Slovakia</option>
          <option value="SI">Slovenia</option>
          <option value="ZA">South Africa</option>
          <option value="SE">Sweden</option>
          <option value="CH">Switzerland</option>
          <option value="TW">Taiwan</option>
          <option value="TH">Thailand</option>
          <option value="TR">Turkey</option>
          <option value="UA">Ukraine</option>
          <option value="AE">United Arab Emirates</option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="VE">Venezuela, Bolivarian Republic of</option>
        </select>

        <button
          className="btn btn-primary mx-3"
          onClick={() => {
            updatePage();
          }}
        >
          Submit
        </button>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((elem, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <NewsItem
                    title={elem.title ? elem.title : ""}
                    description={elem.description ? elem.description : ""}
                    imgurl={elem.urlToImage}
                    newsurl={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
