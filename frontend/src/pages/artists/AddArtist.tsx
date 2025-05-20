import React, { useEffect, useState } from 'react';
import { ErrorMessage, FormContainer, Input, SubmitButton } from '../../components/Form';
import Dialog from '../../components/Dialog';
import type { Artist, ArtistPayload } from '../../features/artists/artist.types';
import { useForm } from 'react-hook-form';
import { artistSchema, type ArtistFormData } from '../../validators/artist.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { useDialog } from '../../contexts/dialog.context';
import { ButtonRow, DeleteButton } from '../../components/Button';


interface Props {

  onSubmit: (artist: FormData, id?: string) => void;
  editingArtist?: Artist | null;
  triggerContent: React.ReactNode;
}

const AddArtist: React.FC<Props> = ({ onSubmit, triggerContent, editingArtist }) => {

  const editMode = !!editingArtist;
  const { closeDialog, openedDialogs } = useDialog()
  const [profilePricture, setProfilePicture] = useState<File | null>(null)
  const dialogId = React.useMemo(() => `${editingArtist ? "edit-artist-" + editingArtist._id : "add-artist"}`, [editingArtist]);

  const { mutuated, creating, updating } = useAppSelector(state => state.artists)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
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
      const formData = new FormData()
      if (profilePricture)
        formData.set('profilePicture', profilePricture)
      formData.set('name', data.name);
      data.bio && formData.append('bio', data.bio)

      onSubmit(formData, editingArtist?._id);
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

  useEffect(() => {
    if (editingArtist) {
      reset({
        name: editingArtist.name,
        bio: editingArtist.bio,
        profilePicture: editingArtist.profilePicture
      });
    }
  }, [editingArtist, reset]);

useEffect(() => {
  if (openedDialogs.includes(dialogId)) {
    reset({
      name: editingArtist?.name,
      bio: editingArtist?.bio,
      profilePicture: editingArtist?.profilePicture
    });
    setProfilePicture(null)
  }
}, [openedDialogs]);

  const prepareBtnText = () => {
    if (creating) {
      return 'Adding...';
    }
    if (updating) {
      return 'Saving...';
    }
    if (editMode) {
      return 'Save ';
    }
    return 'Add artist';
  };
  return (
    <Dialog
      dialogId={dialogId}
      triggerContent={triggerContent}
    >
      <FormContainer onSubmit={handleSubmit(onDataSubmit)}>
        <h2>{editMode ? 'Edit Artist' : 'Add New Artist'}</h2>

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
          type='file'
          accept='image/*'
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) {
              setProfilePicture(file)
            }
          }}
        />
        {
          (profilePricture || editingArtist?.profilePicture) && (
            <img src={profilePricture ? URL.createObjectURL(profilePricture) : editingArtist?.profilePicture} alt="Cover Preview" style={{ width: '100px', height: '100px' }} />
          )
        }
        <ButtonRow>
          {editMode && isDirty && <DeleteButton
            onClick={() => {
              reset({
                name: editingArtist?.name,
                bio: editingArtist?.bio,
                profilePicture: editingArtist?.profilePicture
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

export default AddArtist;
