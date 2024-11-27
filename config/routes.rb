Rails.application.routes.draw do
  root "top#index"

  get "line_login_api/login", to: "line_login_api#login"
  get "line_login_api/callback", to: "line_login_api#callback"
  # ------------------------------------------------------------------------------
  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # ------------------------------------------------------------------------------
end
