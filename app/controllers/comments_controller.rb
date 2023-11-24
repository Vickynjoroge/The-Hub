class CommentsController < ApplicationController

    def index
        post = Post.find(params[:post_id])
        comments = post.comments
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        if comment
            render json: comment, include: :post
        else
            render json: {error: "Comment not found"}, status: :not_found
        end
    end

    def create
        @current_user = User.find_by(id: session[:user_id])
        @current_post = Post.find_by(id: params[:post_id])
    
        if @current_user && @current_post
          comment = @current_user.comments.create(comment_params)
          @current_post.comments << comment # Associate the comment with the post
          render json: comment, status: :created
        else
          render json: { error: "User or Post not found" }, status: :unprocessable_entity
        end
      end

    #   def destroy
    #     comment = Comment.find(params[:id])
    #     comment.destroy
    #     head :no_content
    #   end
    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        head :no_content
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Comment not found" }, status: :not_found
      end

     private

    def comment_params
        params.require(:comment).permit(:comment, :user_id, :post_id)
    end
end