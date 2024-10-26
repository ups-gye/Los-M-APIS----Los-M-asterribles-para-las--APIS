// src/sections/shared/hooks/useClients.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { ApiClientRepository } from '@/modules/clients/infrastructure/ApiClientRepository';
import { getClients } from '@/modules/clients/application/getClients';
import { createClient } from '@/modules/clients/application/createClient';
import { updateClient } from '@/modules/clients/application/updateClient';
import { deleteClient } from '@/modules/clients/application/deleteClient';
import { Client } from '@/modules/clients/domain/Client';
import {
  loadingClients,
  addClient,
  updateClient as updateClientAction,
  removeClient,
  onSelectedClientForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} from '@/redux/states/clients';
import Swal from 'sweetalert2';
import { useCallback } from 'react';

const clientRepository = new ApiClientRepository();

export const useClients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, selectedClient, visibleForm, errors, isLoading } = useSelector(
    (state: RootState) => state.clients
  );

  // const fetchClients = async () => {
  //   try {
  //     const fetchedClients = await getClients(clientRepository)();
  //     dispatch(loadingClients(fetchedClients));
  //   } catch (error) {
  //     console.error('Error fetching clients:', error);
  //     dispatch(loadingError('Error fetching clients'));
  //   }
  // };

  const fetchClients = useCallback(async () => {
    if (!isLoading) return;
    
    try {
      const fetchedClients = await getClients(clientRepository)();
      dispatch(loadingClients(fetchedClients));
    } catch (error) {
      console.error('Error fetching clients:', error);
      dispatch(loadingError('Error fetching clients'));
      Swal.fire('Error', 'Error al cargar clientes', 'error');
    }
  }, [dispatch, isLoading]);

  const handleAddClient = async (clientData: Client) => {
    try {
      const newClient = await createClient(clientRepository)(clientData);
      dispatch(addClient(newClient));
      Swal.fire('Success', 'Client added successfully', 'success');
    } catch (error) {
      console.error('Error adding client:', error);
      dispatch(loadingError('Error adding client'));
    }
  };

  const handleUpdateClient = async (dni: string, clientData: Client) => {
    try {
      const updatedClient = await updateClient(clientRepository)(dni, clientData);
      dispatch(updateClientAction(updatedClient));
      Swal.fire('Success', 'Client updated successfully', 'success');
    } catch (error) {
      console.error('Error updating client:', error);
      dispatch(loadingError('Error updating client'));
    }
  };

  const handleDeleteClient = async (dni: string) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteClient(clientRepository)(dni);
          dispatch(removeClient(dni));
          Swal.fire('Deleted!', 'The client has been deleted.', 'success');
        }
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      dispatch(loadingError('Error deleting client'));
    }
  };

  return {
    clients,
    selectedClient,
    visibleForm,
    errors,
    isLoading,
    fetchClients,
    handleAddClient,
    handleUpdateClient,
    handleDeleteClient,
    onSelectedClientForm: (client: Client) => dispatch(onSelectedClientForm(client)),
    onOpenForm: () => dispatch(onOpenForm()),
    onCloseForm: () => dispatch(onCloseForm()),
  };
};