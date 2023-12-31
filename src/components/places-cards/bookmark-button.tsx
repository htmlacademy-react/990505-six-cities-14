import {postOfferFavoriteStatus} from '../../store/api-actions';
import {CardsSizeType} from '../../types/card-size';
import {MouseEvent, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {OfferType} from '../../types/offers';
import {AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';
import {isUserAuthorized} from '../../store/user-process/selectors';
import {setFavoriteStatus} from '../../store/offers-data/offers-data';

const sizeMap: Record<CardsSizeType, { width: string; height: string }> = {
  small: { width: '18', height: '19' },
  large: { width: '31', height: '33' },
};

type BookmarkButtonProps = {
  offerId: string;
  favoriteStatus: boolean;
  block: string;
  size?: CardsSizeType;
}

function BookmarkButton({offerId, favoriteStatus, block, size = 'small'}: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<boolean>(favoriteStatus);
  const isAuthorizationUser = useAppSelector(isUserAuthorized);
  const bookmarkClasses = `
      ${block}__bookmark-button
      ${status ? `${block}__bookmark-button--active` : ''}
      button`;
  const navigate = useNavigate();
  const handleButtonClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (isAuthorizationUser) {
      postOfferFavoriteStatus(offerId, !status).then((value: OfferType) => {
        setStatus(value.isFavorite);
        dispatch(setFavoriteStatus({offerId, status: value.isFavorite}));
      });
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={bookmarkClasses}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={`${block}__bookmark-icon`} {...sizeMap[size]}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
