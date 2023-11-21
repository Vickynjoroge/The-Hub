class UsersController < ApplicationController
    # before_action :authorize, only: [:index]
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
        render json: user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
    end

    private

    def authorize
        user = User.find_by(id: session[:user_id])
        render json: { errors: ["Not authorized"] }, status: :unauthorized unless user
    end

    def user_params
        params.permit(:first_name, :last_name, :username, :email, :phone_number, :password, :password_confirmation)
    end

    
    def render_error
        render json: {error: "User not found"}, status: :not_found
    end

    def render_response_error
        render json: {error: "Not found"}, status: :not_found
    end 
end
