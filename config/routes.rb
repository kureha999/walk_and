Rails.application.routes.draw do
  root "posts#index"

  devise_for :users, controllers: {
    omniauth_callbacks: "omniauth_callbacks"
  }

  resources :posts


  resources :events do
    get "dates/:date", to: "events#date_details", on: :collection, as: :date
  end

  get "mypage", to: "users#show", as: "mypage"


  # begin 初期Routes --------------------------------------------------------------

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # end -------------------------------------------------------------------------------
end
