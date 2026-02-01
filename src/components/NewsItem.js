import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{ display: "flex", position: "absolute", right: 0, justifyContent: 'flex-end' }}>
            <span className="badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img className="card-img-top" src={imageUrl} alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted" style={{ fontSize: '12px' }}>By {author ? author : "UnKnown"} at {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div >
    )
  }
}

export default NewsItem;