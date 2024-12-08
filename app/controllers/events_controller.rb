class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: %i[edit update destroy]
  before_action :authorize_user!, only: %i[edit update destroy]

  def index
    @events = current_user.events
  end

  def new
    @event = current_user.events.build(time: params[:date]) # URLのdateパラメータを利用
  end

  def create
    @event = current_user.events.build(event_params)
    if @event.save
      redirect_to events_path, notice: "Event created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @event.update(event_params)
      redirect_to events_path, notice: "Event updated successfully."
    else
      render :edit
    end
  end

  def destroy
    @event.destroy
    render json: { status: "success" }
  end

  def date_details
    @date = params[:date]
    @events = current_user.events.where("time::timestamp::date = ?", @date) # timeをtimestamp型にキャストし、その後dateにキャスト
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def authorize_user!
    redirect_to events_path, alert: "You are not authorized to perform this action." unless @event.user == current_user
  end

  def event_params
    params.require(:event).permit(:title, :event_type, :time, :comment)
  end
end
