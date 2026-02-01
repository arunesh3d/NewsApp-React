import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class NewsScroll extends Component {
  static defaultProps = {
    country: 'in',
    category: 'entertainment'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `News - ${this.capitalizeWord(this.props.category)}`
  };

  capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${nextPage}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: nextPage
    });
  };

  render() {
    return (
      <div>
        <h1 className='text-center'>News - Top {this.capitalizeWord(this.props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < 20} //length of articles is not coming correct
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.billboard.com/wp-content/uploads/2025/08/taylor-swift-eras-london-2024billboard-1800.jpg?w=1024"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll >
      </div>
    )
  }
}

export default NewsScroll