import React, { useEffect, useState } from 'react';
import { ErrorMessage, FormContainer, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Song } from '../../features/songs/song.types';
import { useForm } from 'react-hook-form';
import { songSchema, type SongFormData } from '../../validators/song.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useDialog } from '../../contexts/dialog.context';
import { toast } from 'react-toastify';
import { fetchArtists } from '../../features/artists/artist.slice';
import { resetMutation } from '../../features/songs/song.slice';
import { ButtonRow, DeleteButton } from '../../components/Button';

interface Props {
  onSubmit: (song: FormData, id?: string) => void;
  editingSong?: Song | null;
  triggerContent: React.ReactNode;
}

const AddSong: React.FC<Props> = ({ onSubmit, editingSong, triggerContent }) => {

  const editMode = !!editingSong;
  const dispatch = useAppDispatch()
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const { closeDialog, openedDialogs } = useDialog()
  const { artists } = useAppSelector(state => state.artists)
  const dialogId = React.useMemo(() => `${editingSong ? "edit-song-" + editingSong._id : "add-song"}`, [editingSong]);

  const { mutuated, creating, updating, } = useAppSelector(state => state.songs)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors }
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: editingSong?.title ?? '',
      artist: editingSong?.artist ?? '',
      album: editingSong?.album ?? '',
      genre: editingSong?.genre ?? '',
    }
  });

  // Reset form values when editingSong changes
  useEffect(() => {
    reset({
      title: editingSong?.title ?? '',
      artist: editingSong?.artist ?? '',
      album: editingSong?.album ?? '',
      genre: editingSong?.genre ?? '',
      releaseDate: editingSong?.releaseDate ?? '',
      audioUrl: editingSong?.audioUrl ?? '',
    });
  }, [editingSong, reset, open]);


  const onDataSubmit = (data: SongFormData) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('artist', data.artist);
      data.album && formData.append('album', data.album);
      data.genre && formData.append('genre', data.genre);
      data.releaseDate && formData.append('releaseDate', data.releaseDate);
      if (audioFile) {
        formData.append('audio', audioFile);
      }
      onSubmit(formData, editingSong?._id);
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
  }, [mutuated]);


  useEffect(() => {
    if (openedDialogs.includes(dialogId)) {
      dispatch(fetchArtists(""))
    }
  }, [openedDialogs])

  useEffect(() => {
    if (openedDialogs.includes(dialogId)) {
      reset({
        title: editingSong?.title ?? '',
        artist: editingSong?.artist ?? '',
        album: editingSong?.album ?? '',
        genre: editingSong?.genre ?? '',
        releaseDate: editingSong?.releaseDate ?? '',
        audioUrl: editingSong?.audioUrl ?? '',
      });
    }
  }, [openedDialogs])


  const prepateButtonText = () => {
    if (creating) {
      return editMode ? 'Saving...' : 'Adding...';
    }
    return editMode ? 'Save Song' : 'Add Song';
  };
  return (
    <Dialog
      dialogId={dialogId}
      triggerContent={triggerContent}
    >
      <FormContainer onSubmit={ handleSubmit(onDataSubmit)}>
        <h2>{editMode ? 'Edit Song' : 'Add New Song'}</h2>

        <Input
          id="title"
          placeholder="Title"
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
          <option value="">Select Artist</option>
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
          placeholder="Album"
          {...register('album')}
          hasError={!!errors.album}
        />
        <ErrorMessage hasError={!!errors.album}>
          {errors.album?.message}
        </ErrorMessage>
        <Input
          placeholder="Genre"
          {...register('genre')}
          hasError={!!errors.genre}
        />
        <ErrorMessage hasError={!!errors.genre}>
          {errors.genre?.message}
        </ErrorMessage>
        <Input
          type='file'
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setAudioFile(file);
          }}}
          hasError={!!errors.audioUrl}
        />
        <ErrorMessage hasError={!!errors.audioUrl}>
          {errors.audioUrl?.message}
        </ErrorMessage>
        <ButtonRow>
          {editMode && isDirty && <DeleteButton
            onClick={() => {
              reset({
                title: editingSong?.title ?? '',
                artist: editingSong?.artist ?? '',
                album: editingSong?.album ?? '',
                genre: editingSong?.genre ?? '',
                releaseDate: editingSong?.releaseDate ?? '',
                audioUrl: editingSong?.audioUrl ?? '',
              });
            }}
            disabled={creating || updating}
          >
            Discard changes
          </DeleteButton>}
          <SubmitButton disabled={creating || updating} type="submit">
            {prepateButtonText()}
          </SubmitButton>
        </ButtonRow>
      </FormContainer>
    </Dialog>
  );
};

export default AddSong;

