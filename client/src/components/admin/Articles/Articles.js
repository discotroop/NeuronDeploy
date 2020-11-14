import React from "react";
import ArticleDeleteButton from "./ArticleDeleteButton";
import apiCalls from "../../../api/apiCalls";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleArticleDelete = this.handleArticleDelete.bind(this);
    this.getData = this.getData.bind(this);
  }
  getData() {
    apiCalls
      .getAllArticles()
      .then(articles => {
        this.setState({
          Articles: articles.data.data
        });
      })
      .catch(errors => console.log(errors));
  }
  componentDidMount() {
    this.getData();
  }

  handleArticleDelete(id) {
    // Call api to delete
    apiCalls.deleteArticleById(id).then(() => this.getData());
  }

  render() {
    return (
      <div className="Articles">
        <div className="Articles-header">Articles</div>
        {this.state.Articles ? (
          <div>
            {" "}
            <BuildArticleTable
              Articles={this.state.Articles}
              handleDelete={this.handleArticleDelete}
            />{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

class BuildArticleTable extends React.Component {
  render() {
    return (
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
              <th scope="col">ID</th>
              <th scope="col">Subscribers</th>
              <th scope="col">Delete</th>
            </tr>
            {this.props.Articles.map(article => (
              <tr className="table-light" key={article._id}>
                <th scope="row">{article.title}</th>
                <td>{article.article_URL}</td>
                <td>{article._id}</td>
                <td>
                  <button>Subscribers</button>
                </td>
                <td>
                  <ArticleDeleteButton
                    handleDelete={this.props.handleDelete}
                    id={article._id}
                  />
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

// {this.state.apiResponse.name}

export default Articles;
