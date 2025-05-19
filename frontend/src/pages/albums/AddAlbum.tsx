import React, { useEffect } from 'react';
import { ErrorMessage, FormContainer, FormHeader, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Album } from '../../features/albums/album.types';
import { useForm } from 'react-hook-form';
import { albumSchema, type AlbumFormData } from '../../validators/album.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { fetchArtists } from '../../features/artists/artist.slice';
import { resetMutation } from '../../features/albums/album.slice';
import { ButtonRow, DeleteButton } from '../../components/Button';
import { getDateForInput } from '../../utils/date';


interface Props {
  onSubmit: (album: FormData, id?: string) => void;
  editingAlbum?: Album | null;
  triggerContent?: React.ReactNode;
}

const AddAlbum: React.FC<Props> = ({ onSubmit, triggerContent, editingAlbum }) => {

  const editMode = !!editingAlbum;
  const dispatch = useAppDispatch()
  const { closeDialog, openedDialogs } = useDialog()
  const { artists } = useAppSelector(state => state.artists)
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
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

  const onDataSubmit = async (data: AlbumFormData) => {
    try {
      const formData = new FormData();
      if (coverImage) {
        console.log(coverImage)
        formData.append('coverImage', coverImage);
      }
      formData.append('title', data.title);
      formData.append('artist', data.artist);
      data.genre && formData.append('genre', data.genre);
      formData.append('releaseDate', data.releaseDate);
      formData.append('songs', JSON.stringify(data.songs));

      onSubmit(formData, editingAlbum?._id);
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
    if (openedDialogs.includes(dialogId)) {
      dispatch(fetchArtists(""))
    }
  }), [openedDialogs])

  useEffect(() => {

    reset({
      title: editingAlbum?.title,
      artist: editingAlbum?.artist,
      genre: editingAlbum?.genre,
      releaseDate: getDateForInput(editingAlbum?.releaseDate),
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
          placeholder="Cover Image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setCoverImage(file);
            }
          }}
        />
        {(coverImage || editingAlbum?.coverImage) && <img src={coverImage ? URL.createObjectURL(coverImage) : editingAlbum?.coverImage} alt="Cover Preview" style={{ width: '100px', height: '100px' }} />}

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


