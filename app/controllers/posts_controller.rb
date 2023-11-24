class PostsController < ApplicationController
    def index
        posts = Post.order(created_at: :desc).all
        render json: posts
      end
    
      def show
        post = Post.find(params[:id])
        render json: post
      end
    
      def create
        @current_user = User.find_by(id: session[:user_id])
        post = @current_user.posts.create!(post_params)
        render json: post
      end
    
      def update
        post = Post.find(params[:id])
        post.update!(post_params)
        render json: post
      end
    
      def destroy
        @current_user = User.find_by(id: session[:user_id])
        post = Post.find(params[:id])
    
        if post.user_id == @current_user.id
          Comment.where(post_id: post.id).destroy_all # Delete associated comments
          post.destroy
          head :no_content
        else
          render json: { error: "You are not authorized to delete this post" }, status: :forbidden
        end
      end
    
      def increment_likes
        post = Post.find(params[:id])
        post.increment!(:likes)
        render json: post
      end
    
      private
    
      def post_params
        params.permit(:category, :description, :image_url, :user_id)
      end
end
