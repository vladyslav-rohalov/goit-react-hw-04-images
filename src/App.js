import React, { Component } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar, ImageGallery, OpenModal, Button } from './Components';
import axios from 'axios';

export default class App extends Component {
  state = {
    query: '',
    modal: false,
    page: 1,
    largeImageUrl: '',
    imageList: [],
    isLoading: false,
    emptyResponse: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.onSearchRequest();
    }
  }

  // ===query request method===
  onSearchRequest() {
    this.spinnerOn();

    const KEY = '32075942-33ac7ec23728def8e99295683';
    const perPage = 12;
    const { page, query } = this.state;
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    axios
      .get(URL)
      .then(response => {
        this.onEmptyResponse(response);

        if (response.status === 200) {
          setTimeout(() => this.spinnerOff(), 500);
        }

        this.setState(prevState => {
          return {
            imageList: [].concat(prevState.imageList, response.data.hits),
            totalHits: response.data.totalHits,
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ===Spinner on/off===

  spinnerOn() {
    this.setState({ isLoading: true });
  }

  spinnerOff() {
    this.setState({ isLoading: false });
  }

  // ===check response, if response empty paste plug===

  onEmptyResponse(response) {
    response.data.hits.length === 0
      ? this.setState({ emptyResponse: true })
      : this.setState({ emptyResponse: false });
  }

  // === SearchForm ===
  handleSearchFormSubmit = searchQuery => {
    this.setState({ query: searchQuery, imageList: [], page: 1, totalHits: 0 });
  };

  // === Page increment ===
  handleChangePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  // === Modal ====
  handleModalOpen = event => {
    const smallImageSrc = event.target.currentSrc;
    const chosenImage = this.state.imageList.find(
      item => item.webformatURL === smallImageSrc
    );
    this.setState({ largeImageUrl: chosenImage.largeImageURL });
    this.setState({ modal: true });
  };

  handleCloseModal = e => {
    if (e.target.tagName === 'DIV' || e.target.code === 'Escape') {
      this.setState({ modal: false });
    }
  };

  handleOnBtnCloseModal = () => {
    this.setState({ modal: false });
  };

  //===Render===
  render() {
    return (
      <AppStyle
        onClick={this.handleCloseModal}
        onKeyDown={this.handleCloseModal}
        tabIndex="0"
      >
        <Searchbar onFormSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          response={this.state.imageList}
          isLoading={this.state.isLoading}
          emptyResponse={this.state.emptyResponse}
          onImageClick={this.handleModalOpen}
        />
        {this.state.modal && (
          <OpenModal
            largeImage={this.state.largeImageUrl}
            onBtnCloseModal={this.handleOnBtnCloseModal}
          />
        )}
        {this.state.imageList.length > 0 &&
          this.state.imageList.length < this.state.totalHits && (
            <Button onBtnClick={this.handleChangePage} />
          )}
      </AppStyle>
    );
  }
}
