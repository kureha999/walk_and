Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: "omniauth_callbacks"
  }
  root "top#index"

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
