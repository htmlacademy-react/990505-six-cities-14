import {postFavoriteAction} from '../../store/api-actions';
import {useAppDispatch} from '../../store/hooks';
import {CardsSizeType} from '../../types/card-size';

const sizeMap: Record<CardsSizeType,{ width: string; height: string }> = {
  small: { width: '18', height: '19' },
  large: { width: '31', height: '33' },
};

type BookmarkButtonProps = {
  offerId: string;
  favoriteStatus: boolean;
  block: string;
  size?: CardsSizeType;
}
function BookmarkButton ({offerId, favoriteStatus, block, size = 'small'}: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <button
      className={`
      ${block}__bookmark-button
      ${favoriteStatus ? `${block}__bookmark-button--active` : ''}
      button`}
      type="button"
      onClick={
        () => {
          dispatch(postFavoriteAction({offerId, favoriteStatus}));
        }
      }
    >
      <svg className={`${block}__bookmark-icon`} {...sizeMap[size]}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
