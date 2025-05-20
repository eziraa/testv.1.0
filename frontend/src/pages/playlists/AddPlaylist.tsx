import React, { useEffect, useState } from 'react';
import { ErrorMessage, FormContainer, Input, Select, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Playlist } from '../../features/playlists/playlist.types';
import { useForm } from 'react-hook-form';
import { playlistSchema, type PlaylistFormData } from '../../validators/playlist.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { fetchSongs } from '../../features/songs/song.slice';
import { resetMutation } from '../../features/playlists/playlist.slice';


interface Props {
  onSubmit: (playlist: FormData, id?: string) => void;
  editingPlaylist?: Playlist | null;
  triggerContent: React.ReactNode;
}

const AddPlaylist: React.FC<Props> = ({ onSubmit, editingPlaylist, triggerContent }) => {

  const editMode = !!editingPlaylist;
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const { closeDialog, openedDialogs } = useDialog()
  const { songs } = useAppSelector(state => state.songs)
  const dialogId = React.useMemo(() => `${editingPlaylist ? "edit-playlist-" + editingPlaylist._id : "add-playlist"}`, [editingPlaylist]);

  const { mutuated, creating, updating } = useAppSelector(state => state.playlists)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name: editingPlaylist?.name || '',
      user: editingPlaylist?.user || user?._id || "",
      songs: editingPlaylist?.songs,
    }
  });

  const onDataSubmit = (data: PlaylistFormData) => {
    try {
      const formData = new FormData();
      if (coverImage) {
        formData.append("coverImage", coverImage)
      }
        formData.append('name', data.name)
        formData.append('songs', JSON.stringify(data.songs?.filter(song => !!song)))
        formData.append('user', user?._id || "")
      onSubmit(formData, editingPlaylist?._id);
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
      dispatch(fetchSongs(""))
    }
  }), [openedDialogs])

  useEffect(() => {

    reset({
      name: editingPlaylist?.name || '',
      user: editingPlaylist?.user || user?._id || 'userid',
      songs: editingPlaylist?.songs,
    });
    setCoverImage(null)
  }, [editingPlaylist, reset, openedDialogs]);

  const prepareBtnText = () => {
    if (creating) {
      return 'Creating...';
    }
    if (updating) {
      return 'Updating...';
    }
    if (editMode) {
      return 'Update Playlist';
    }
    return 'Add Playlist';
  };


  return (
    <Dialog
      dialogId={dialogId}
      triggerContent={triggerContent}
    >
      <FormContainer onSubmit={handleSubmit(onDataSubmit)}>
        <h2>{editMode ? 'Edit Playlist' : 'Add New Playlist'}</h2>

        <Input
          id="name"
          placeholder="Playlist Name"
          {...register('name')}
          hasError={!!errors.name}
        />
        <ErrorMessage hasError={!!errors.name}>
          {errors.name?.message}
        </ErrorMessage>

        <Select
          id="artist"
          {...register('songs')}
          hasError={!!errors.songs}
          multiple
        >
          <option value="" disabled selected>Select Artist</option>
          {songs.map((song) => (
            <option
              key={song._id}
              value={song._id}
            >
              {song.title}
            </option>
          ))}
        </Select>

        <ErrorMessage hasError={!!errors.songs}>
          {errors.songs?.message}
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
        {(coverImage || editingPlaylist?.coverImage) && <img src={coverImage ? URL.createObjectURL(coverImage) : editingPlaylist?.coverImage} alt="Cover Preview" style={{ width: '100px', height: '100px' }} />}

        {
          errors && Object.keys(errors).length > 0 && (
            <ErrorMessage hasError={true}>
              {Object.values(errors).map((error) => error.message).join(', ')}
            </ErrorMessage>
          )
        }


        <SubmitButton disabled={creating || updating} type="submit">
          {prepareBtnText()}
        </SubmitButton>
      </FormContainer>
    </Dialog>
  );
};

export default AddPlaylist;
