import React, { useEffect } from 'react';
import { ErrorMessage, FormContainer, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Album, AlbumPayload } from '../../features/albums/album.types';
import { useForm } from 'react-hook-form';
import { albumSchema, type AlbumFormData } from '../../validators/album.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { Pencil, Plus } from 'lucide-react';
import { fetchArtists } from '../../features/artists/artist.slice';


interface Props {
  onSubmit: (album: AlbumPayload, id?: string) => void;
  editingAlbum?: Album | null;
}

const AddAlbum: React.FC<Props> = ({ onSubmit, editingAlbum }) => {

  const dispatch = useAppDispatch()
  const { closeDialog, openedDialogs } = useDialog()
  const { artists } = useAppSelector(state => state.artists)
  const dialogId = React.useMemo(() => `${editingAlbum ? "edit-album-" + editingAlbum._id : "add-album"}`, [editingAlbum]);

  const { mutuated, creating, updating } = useAppSelector(state => state.albums)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
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



  return (
    <Dialog
      dialogId={dialogId}
      icon={editingAlbum ? <Pencil size={18} /> : <Plus size={18} />}
      triggerText={<span>  Album</span>}    >
      <FormContainer onSubmit={handleSubmit(onDataSubmit)}>
        <h2>{editingAlbum ? 'Edit Album' : 'Add New Album'}</h2>

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
        <SubmitButton disabled={creating || updating} type="submit">
          {editingAlbum ? 'Update Album' : 'Add Album'}
        </SubmitButton>
      </FormContainer>
    </Dialog>
  );
};

export default AddAlbum;
