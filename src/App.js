import React, { useState, useEffect } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar, ImageGallery, OpenModal, Button } from './Components';
import axios from 'axios';

export default function App() {
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyResponse, setEmptyResponse] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }

    function onSearchRequest() {
      spinnerToggle(true);
      const KEY = '32075942-33ac7ec23728def8e99295683';
      const perPage = 12;
      const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      axios
        .get(URL)
        .then(response => {
          onEmptyResponse(response);

          if (response.status === 200) {
            setTimeout(() => spinnerToggle(false), 500);
          }
          setImageList(prevArray => [].concat(prevArray, response.data.hits));
          setTotalHits(response.data.totalHits);
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    onSearchRequest();
  }, [query, page]);

  // ===Spinner on/off===
  function spinnerToggle(value) {
    setIsLoading(value);
  }

  // ===check response, if response empty paste plug===
  function onEmptyResponse(response) {
    response.data.hits.length === 0
      ? setEmptyResponse(true)
      : setEmptyResponse(false);
  }

  // === SearchForm ===
  function handleSearchFormSubmit(searchQuery) {
    setQuery(searchQuery);
    setImageList([]);
    setPage(1);
    setTotalHits(0);
  }

  // === Page increment ===
  function handleChangePage() {
    setPage(page + 1);
  }

  // === Modal ====
  function handleModalOpen(event) {
    const smallImageSrc = event.target.currentSrc;
    const chosenImage = imageList.find(
      item => item.webformatURL === smallImageSrc
    );
    setLargeImageUrl(chosenImage.largeImageURL);
    setModal(true);
  }

  function handleCloseModal(e) {
    if (e.target.tagName === 'DIV' || e.target.code === 'Escape') {
      setModal(false);
    }
  }

  function handleOnBtnCloseModal() {
    setModal(false);
  }

  return (
    <AppStyle
      onClick={handleCloseModal}
      onKeyDown={handleCloseModal}
      tabIndex="0"
    >
      <Searchbar onFormSubmit={handleSearchFormSubmit} />
      <ImageGallery
        response={imageList}
        isLoading={isLoading}
        emptyResponse={emptyResponse}
        onImageClick={handleModalOpen}
      />
      {modal && (
        <OpenModal
          largeImage={largeImageUrl}
          onBtnCloseModal={handleOnBtnCloseModal}
        />
      )}
      {imageList.length > 0 && imageList.length < totalHits && (
        <Button onBtnClick={handleChangePage} />
      )}
    </AppStyle>
  );
}
