import React, { useEffect } from 'react';
import { ErrorMessage, FormContainer, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Song, SongPayload } from '../../features/songs/song.types';
import { useForm } from 'react-hook-form';
import { songSchema, type SongFormData } from '../../validators/song.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useDialog } from '../../contexts/dialog.context';
import { toast } from 'react-toastify';
import { fetchArtists } from '../../features/artists/artist.slice';
import { Plus } from 'lucide-react';
import styled from 'styled-components';
import { Dismissable } from '../../components/Layout';

interface Props {
  onSubmit: (song: SongPayload, id?: string) => void;
  editingSong?: Song | null;
}

const AddSong: React.FC<Props> = ({ onSubmit, editingSong }) => {

  const dispatch = useAppDispatch()
  const { closeDialog, openedDialogs } = useDialog()
  const { artists } = useAppSelector(state => state.artists)
  const dialogId = React.useMemo(() => `${editingSong ? "edit-song-" + editingSong._id : "add-song"}`, [editingSong]);


  const { mutuated, creating, } = useAppSelector(state => state.songs)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
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
      realseDate: editingSong?.releaseDate ?? '',
      audioUrl: editingSong?.audioUrl ?? '',
    });
  }, [editingSong, reset, open]);


  const onDataSubmit = (data: SongFormData) => {
    try {
      onSubmit(data, editingSong?._id);
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
  }
    , [mutuated]);


  useEffect(() => {
    dispatch(fetchArtists())
  }
    , [dispatch])

  useEffect(() =>{
    if (openedDialogs.includes(dialogId)) {
      reset({
        title: editingSong?.title ?? '',
        artist: editingSong?.artist ?? '',
        album: editingSong?.album ?? '',
        genre: editingSong?.genre ?? '',
        realseDate: editingSong?.releaseDate ?? '',
        audioUrl: editingSong?.audioUrl ?? '',
      });
    }
  }, [openedDialogs])
  return (
    <Dialog
      dialogId={dialogId}
      icon={<Plus size={20} />}
      triggerText={<span> <Dismissable>{editingSong ? "Edit" : "Add"}</Dismissable> Song</span>}
    >
      <FormContainer onSubmit={handleSubmit(onDataSubmit)}>
        <h2>{editingSong ? 'Edit Song' : 'Add New Song'}</h2>

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
          placeholder="Audio URL"
          {...register('audioUrl')}
          hasError={!!errors.audioUrl}
        />
        <ErrorMessage hasError={!!errors.audioUrl}>
          {errors.audioUrl?.message}
        </ErrorMessage>
        <SubmitButton disabled={creating} type="submit">
          {editingSong ? 'Update Song' : 'Add Song'}
        </SubmitButton>
      </FormContainer>
    </Dialog>
  );
};

export default AddSong;

