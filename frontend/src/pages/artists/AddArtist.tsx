import React, { useEffect } from 'react';
import { ErrorMessage, FormContainer, Input, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Artist, ArtistPayload } from '../../features/artists/artist.types';
import { useForm } from 'react-hook-form';
import { artistSchema, type ArtistFormData } from '../../validators/artist.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {  useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { Plus } from 'lucide-react';
import { Dismissable } from '../../components/Layout';


interface Props {
  onSubmit: (artist: ArtistPayload, id?: string) => void;
  editingArtist?: Artist | null;
}

const AddArtist: React.FC<Props> = ({ onSubmit, editingArtist }) => {

  const { closeDialog } = useDialog()
  const dialogId = React.useMemo(() => `${editingArtist ? "edit-artist-" + editingArtist._id : "add-artist"}`, [editingArtist]);

  const { mutuated, creating, updating } = useAppSelector(state => state.artists)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      name: editingArtist?.name ?? '',
      bio: editingArtist?.bio ?? '',
      profilePicture: editingArtist?.profilePicture ?? '',
    }
  });

  const onDataSubmit = (data: ArtistFormData) => {
    try {
      onSubmit(data, editingArtist?._id);
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



  return (
    <Dialog
      dialogId={dialogId}
      icon={<Plus size={20} />}
      triggerText={<span> <Dismissable>{editingArtist ? "Edit" : "Add"}</Dismissable> Song</span>}    >
      <FormContainer onSubmit={handleSubmit(onDataSubmit)}>
        <h2>{editingArtist ? 'Edit Artist' : 'Add New Artist'}</h2>

        <Input
          id="name"
          placeholder="Artist Name"
          {...register('name')}
          hasError={!!errors.name}
        />
        <ErrorMessage hasError={!!errors.name}>
          {errors.name?.message}
        </ErrorMessage>

        <Input
          placeholder="Bio"
          {...register('bio')}
          hasError={!!errors.bio}
        />
        <ErrorMessage hasError={!!errors.bio}>
          {errors.bio?.message}
        </ErrorMessage>

        <Input
          placeholder="Profile Picture"
          {...register('profilePicture')}
          hasError={!!errors.profilePicture}
        />
        <ErrorMessage hasError={!!errors.profilePicture}>
          {errors.profilePicture?.message}
        </ErrorMessage>
        <SubmitButton disabled={creating || updating} type="submit">
          {editingArtist ? 'Update Artist' : 'Add Artist'}
        </SubmitButton>
      </FormContainer>
    </Dialog>
  );
};

export default AddArtist;
