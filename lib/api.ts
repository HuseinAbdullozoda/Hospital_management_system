const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
      }

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Appointment endpoints
  async getAppointments() {
    return this.request('/appointments/');
  }

  async rescheduleAppointment(appointmentId: number, updateData: any) {
    return this.request(`/appointments/${appointmentId}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async startConsultation(appointmentId: number) {
    return this.request(`/appointments/${appointmentId}/start-consultation`, {
      method: 'POST',
    });
  }

  // Lab test endpoints
  async getLabTests() {
    return this.request('/lab/tests');
  }

  async updateTestStatus(testId: number, status: string) {
    return this.request(`/lab/tests/${testId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async generateTestReport(testId: number) {
    return this.request(`/lab/tests/${testId}/generate-report`, {
      method: 'POST',
    });
  }

  // Hospital endpoints
  async getHospitals() {
    return this.request('/hospitals/');
  }

  async approveHospital(hospitalId: number) {
    return this.request(`/hospitals/${hospitalId}/approve`, {
      method: 'POST',
    });
  }

  async rejectHospital(hospitalId: number, reason: string) {
    return this.request(`/hospitals/${hospitalId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Pharmacy endpoints
  async getMedicines() {
    return this.request('/pharmacy/medicines');
  }

  async toggleMedicineAvailability(medicineId: number) {
    return this.request(`/pharmacy/medicines/${medicineId}/toggle-availability`, {
      method: 'PUT',
    });
  }

  async exportPharmacyData() {
    return this.request('/pharmacy/export-data', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 