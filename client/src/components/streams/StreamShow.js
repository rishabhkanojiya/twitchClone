import React, { Component } from "react";
import FlvJs from "flv.js";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }
  // ref ref ref
  // ref ref ref
  // ref ref ref

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = FlvJs.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  renderList = () => {
    return (
      <div className="card ">
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <img
              src="https://i.ytimg.com/vi/d_T5P-zIIAs/maxresdefault.jpg"
              alt=""
              style={{
                height: "90px",
                width: "140px",
                margin: "10px",
                padding: "5px",
                backgroundSize: "cover"
              }}
            />
          </div>
          <div className="col-sm-8">
            <div className="card-body ">
              <h5 className="card-title">Title</h5>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderCard = () => {
    return (
      <div class="card">
        <img
          class="card-img-top"
          src="https://i.ytimg.com/vi/d_T5P-zIIAs/maxresdefault.jpg"
          alt=""
        />
        <div class="card-body">
          <h4 class="card-title">{this.props.stream.title}</h4>
          <p class="card-text">{this.props.stream.description}</p>
        </div>
      </div>
    );
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="row">
          <video
            ref={this.videoRef}
            style={{ width: "80%", height: "60%" }}
            controls
          />
          {/* <div className="col-sm-8">{this.renderCard()}</div> */}
          <div className="col-sm-4">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.stream[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
