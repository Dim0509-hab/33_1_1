
public function users()
{
    return $this->belongsToMany(User::class);
}

public function messages()
{
    return $this->hasMany(Message::class);
}
