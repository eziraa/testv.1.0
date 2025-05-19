import React, { useEffect } from 'react';
import { ErrorMessage, FormContainer, FormHeader, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Album, AlbumPayload } from '../../features/albums/album.types';
import { useForm } from 'react-hook-form';
import { albumSchema, type AlbumFormData } from '../../validators/album.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { fetchArtists } from '../../features/artists/artist.slice';
import { resetMutation } from '../../features/albums/album.slice';
import { ButtonRow,  DeleteButton } from '../../components/Button';


interface Props {
  onSubmit: (album: AlbumPayload, id?: string) => void;
  editingAlbum?: Album | null;
  triggerContent?: React.ReactNode;
}

const AddAlbum: React.FC<Props> = ({ onSubmit,triggerContent, editingAlbum }) => {

  const editMode = !!editingAlbum;
  const dispatch = useAppDispatch()
  const { closeDialog, openedDialogs } = useDialog()
  const { artists } = useAppSelector(state => state.artists)
  const dialogId = React.useMemo(() => `${editingAlbum ? "edit-album-" + editingAlbum._id : "add-album"}`, [editingAlbum]);

  const { mutuated, creating, updating } = useAppSelector(state => state.albums)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors }
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: editingAlbum?.title ?? '',
      artist: editingAlbum?.artist ?? '',
      genre: editingAlbum?.genre ?? '',
      releaseDate: editingAlbum?.releaseDate ?? '',
      songs: editingAlbum?.songs ?? [],
      coverImage: editingAlbum?.coverImage ?? '',
    }
  });

  const onDataSubmit = (data: AlbumFormData) => {
    try {
      onSubmit(data, editingAlbum?._id);
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (mutuated) {
      closeDialog(dialogId)
      dispatch(resetMutation({
        mutuated: false,
      }))
    }
  }, [mutuated])

  useEffect((() => {
    dispatch(fetchArtists())
  }), [dispatch])

  useEffect(() => {

    reset({
      title: editingAlbum?.title,
      artist: editingAlbum?.artist,
      genre: editingAlbum?.genre,
      releaseDate: editingAlbum?.releaseDate,
      songs: editingAlbum?.songs,
      coverImage: editingAlbum?.coverImage
    });
  }, [editingAlbum, reset, openedDialogs]);


  const prepareBtnText = () => {
    if (creating) {
      return 'Adding...';
    }
    if (updating) {
      return 'Saving...';
    }
    return editMode ? 'Save' : 'Add Album';
  };

  return (
    <Dialog
      dialogId={dialogId}
      triggerContent={triggerContent}
      >
      <FormContainer
        onSubmit={handleSubmit(onDataSubmit)}>
        <FormHeader>
          <h2>{editMode ? 'Edit Album' : 'Add New Album'}</h2>
        </FormHeader>

        <Input
          id="name"
          placeholder="Album Name"
          {...register('title')}
          hasError={!!errors.title}
        />
        <ErrorMessage hasError={!!errors.title}>
          {errors.title?.message}
        </ErrorMessage>

        <Select
          id="artist"
          {...register('artist')}
          hasError={!!errors.artist}
        >
          <option value="" disabled selected>Select Artist</option>
          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </Select>

        <ErrorMessage hasError={!!errors.artist}>
          {errors.artist?.message}
        </ErrorMessage>

        <Input
          placeholder="Genre"
          id="genre"
          {...register('genre')}
          hasError={!!errors.genre}
        />
        <ErrorMessage hasError={!!errors.genre}>
          {errors.genre?.message}
        </ErrorMessage>
        <Input
          placeholder="Release Date"
          id="releaseDate"
          type="date"
          {...register('releaseDate')}
          hasError={!!errors.releaseDate}
        />
        <ErrorMessage hasError={!!errors.releaseDate}>
          {errors.releaseDate?.message}
        </ErrorMessage>
        <Input
          placeholder="Cover Image URL"
          id="coverImage"
          type="url"
          {...register('coverImage')}
          hasError={!!errors.coverImage}
        />
        <ErrorMessage hasError={!!errors.coverImage}>
          {errors.coverImage?.message}
        </ErrorMessage>
        <ButtonRow>
          {editMode && isDirty && <DeleteButton
            onClick={() => {
              reset({
                title: editingAlbum?.title,
                artist: editingAlbum?.artist,
                genre: editingAlbum?.genre,
                releaseDate: editingAlbum?.releaseDate,
                songs: editingAlbum?.songs,
                coverImage: editingAlbum?.coverImage
              });
            }}
            disabled={creating || updating}
          >
            Discard changes
          </DeleteButton>}
          <SubmitButton disabled={creating || updating} type="submit">
            {prepareBtnText()}
          </SubmitButton>
        </ButtonRow>
      </FormContainer>
    </Dialog>
  );
};

export default AddAlbum;


