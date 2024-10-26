import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../../modules/clients/domain/Client';

interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  visibleForm: boolean;
  errors: string | null;
  isLoading: boolean;
  hasLoaded: boolean;
}

const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  visibleForm: false,
  errors: null,
  isLoading: true,
  hasLoaded: false
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    loadingClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
      state.isLoading = false;
      state.hasLoaded = true;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.clients.findIndex(client => client.dni === action.payload.dni);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    removeClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter(client => client.dni !== action.payload);
    },
    onSelectedClientForm: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.selectedClient = null;
    },
    loadingError: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
  },
});

export const {
  loadingClients,
  addClient,
  updateClient,
  removeClient,
  onSelectedClientForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = clientsSlice.actions;

export default clientsSlice.reducer;