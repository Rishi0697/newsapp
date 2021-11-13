import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
// import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps={
        country:'in',
        pageSize: 8,
        category: 'general'
    }
    static propType={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
      constructor(){
          super();
          console.log("hello i am a constructor from news component")
          this.state={
             articles: [],
             page:1,
             totalResults: 0
          }
      }
      async componentDidMount(){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=7c33d4fd16b44c2a9d9ebe10a12d9e75&page=1&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json()
          this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})
      }
      handleNextClick=async()=>{
          console.log("next");
          if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

          }
          else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=7c33d4fd16b44c2a9d9ebe10a12d9e75&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page:this.state.page + 1,
            articles: parsedData.articles
        })
      }
    }
      handlePrevClick= async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=7c33d4fd16b44c2a9d9ebe10a12d9e75&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            page:this.state.page - 1
        })
      }
      fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=7c33d4fd16b44c2a9d9ebe10a12d9e75&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false
          
      })

      };
  render() {
    return (
      <div className="container my-3">
        <h1>NewsToday-top headlines</h1>
        {/* <Spinner/> */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="row">
        
        {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
        })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}
