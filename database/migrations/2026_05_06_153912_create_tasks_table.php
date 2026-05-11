<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->foreignId('course_id')->nullable()->constrained()->onDelete('set null');

            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('type', ['review', 'assignment', 'lecture'])->default('assignment');

            $table->enum('repeat_interval', ['none', 'daily', 'weekly', 'monthly'])->default('none');
            $table->boolean('is_done')->default(false);
            $table->dateTime('due_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
