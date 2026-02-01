import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
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
      loading: false,
      page: 1
    }
    document.title = `News - ${this.capitalizeWord(this.props.category)}`
  };

  capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews();
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      this.setState({
        page: this.state.page + 1,
      })
      this.updateNews();
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News - Top {this.capitalizeWord(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!(this.state.loading) && this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.billboard.com/wp-content/uploads/2025/08/taylor-swift-eras-london-2024billboard-1800.jpg?w=1024"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News;