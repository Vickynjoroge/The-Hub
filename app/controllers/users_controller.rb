class UsersController < ApplicationController
    before_action :authorize, only: [:index]
    rescue_from ActiveRecord::RecordNotFound, with: :render_response_error
    rescue_from ActiveRecord::RecordInvalid, with: :render_error
  
    def index
      render json: User.all, status: :ok
    end
  
    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user
    end

    def update
      user = User.find(params[:id])
      user.update!(user_params)
      render json: user
    end
  
    def show
      user = User.find_by(id: session[:user_id])
      if user
        render json: user
      else
        render json: { errors: ["User not found"] }, status: :not_found
      end
    end
  
    def destroy
      user = User.find(params[:id])
      user.destroy
      render json: { message: "User successfully destroyed" }, status: :ok
    end
  
    private
  
    def authorize
      user = User.find_by(id: session[:user_id])
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless user
    end
  
    def user_params
      params.permit(:name, :email, :password, :zipcode, :premium)
    end
  
    def render_error(exception)
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  
    def render_response_error
      render json: { error: "Record not found" }, status: :not_found
    end
  end
  