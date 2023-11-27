import {postOfferFavoriteStatus} from '../../store/api-actions';
import {CardsSizeType} from '../../types/card-size';
import {MouseEvent, useState} from 'react';

import {CurrentOfferType} from '../../types/current-offer';
import {useAppDispatch} from '../../store/hooks';
import {setFavoriteStatus} from '../../store/action';
import {OfferType} from '../../types/offers';
import {OfferPreviewType} from '../../types/offers-preview';

const sizeMap: Record<CardsSizeType, { width: string; height: string }> = {
  small: { width: '18', height: '19' },
  large: { width: '31', height: '33' },
};


type BookmarkButtonProps = {
  offerId: string;
  favoriteStatus: boolean;
  block: string;
  size?: CardsSizeType;
  currentOffer: CurrentOfferType | OfferPreviewType;
}

function BookmarkButton({offerId, favoriteStatus, block, size = 'small'}: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<boolean>(favoriteStatus);
  const bookmarkClasses = `
      ${block}__bookmark-button
      ${status ? `${block}__bookmark-button--active` : ''}
      button`;

  const handleClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    postOfferFavoriteStatus(offerId, !status).then((value: OfferType) => {
      setStatus(value.isFavorite);
      dispatch(setFavoriteStatus({offerId, status: value.isFavorite}));
    });
  };

  return (
    <button
      className={bookmarkClasses}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${block}__bookmark-icon`} {...sizeMap[size]}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
