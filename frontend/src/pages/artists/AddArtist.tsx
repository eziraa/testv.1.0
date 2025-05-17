import React, { useState, useEffect } from 'react';
import { ErrorMessage, FormContainer, Input, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Artist, ArtistPayload } from '../../features/artists/artist.types';
import { useForm } from 'react-hook-form';
import { artistSchema, type ArtistFormData } from '../../validators/artist.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';


interface Props {
  onSubmit: (artist: ArtistPayload, id?: string) => void;
  editingArtist?: Artist | null;
}

const AddArtist: React.FC<Props> = ({ onSubmit, editingArtist }) => {
  const {closeDialog} = useDialog()
  const dialogId = React.useMemo(() => `${editingArtist ? "edit-artist-"+editingArtist._id : "add-artist" }`, [editingArtist]);

  const [creating, setCreating] = useState(false)

  const { mutuated, error } = useAppSelector(state => state.artists)

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
    setCreating(true)
    try {
      onSubmit(data, editingArtist?._id);
    } catch (error) {
      console.log("Failed to add artist")
      toast.error("Failed to add artist")
    }
  };

  useEffect(() => {
    if(!creating) return;
    if (mutuated) {
      closeDialog(dialogId)
      toast.success("Arist added successfully!")
    }
    if (error) {
      toast.error("Failed to add artist")
    }
    setCreating(false)

  }, [mutuated])

  return (
    <Dialog
      dialogId={dialogId}
      triggerText={editingArtist ? 'Edit Artist' : 'Add New Artist'}
    >
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
        <SubmitButton disabled={creating} type="submit">
          {editingArtist ? 'Update Artist' : 'Add Artist'}
        </SubmitButton>
      </FormContainer>
    </Dialog>
  );
};

export default AddArtist;
